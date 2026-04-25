import os
from collections import deque
from pathlib import Path

from PIL import Image, ImageFilter


ROOT = Path(r"C:\Users\matab\Documents\New project")
ASSETS_DIR = ROOT / "assets" / "mice"

TARGET_SIZE = 500
PADDING = 22
MAX_WORK_SIZE = 900
HOLE_AREA_MIN = 12
HOLE_AREA_RATIO_MAX = 0.03
WEBP_QUALITY = 80  # Compression 80% pour équilibre qualité/légèreté

INPUTS = {
    "steelseries-rival-100-cutout": ROOT / "assets" / "mice" / "SteelSeries Rival 100 mouse png.jpg",
    "logitech-pebble-m350-cutout": ROOT / "assets" / "mice" / "logitech-m350 wireless.png",
    "logitech-m90-cutout": ROOT / "assets" / "mice" / "logitech-m90.png",
    "razer-basilisk-v3-cutout": Path(r"C:\Users\matab\Desktop\Images souris\Razer Basilisk V3.webp"),
    "razer-deathadder-v3-cutout": Path(r"C:\Users\matab\Desktop\Images souris\Razer DeathAdder V3.png"),
    "glorious-model-d-cutout": Path(r"C:\Users\matab\Desktop\Images souris\Glorious Model D.jpg"),
    "microsoft-pro-intellimouse-cutout": Path(r"C:\Users\matab\Desktop\Images souris\Microsoft Pro Intellimouse.jpg"),
    "trust-gxt-105-cutout": Path(r"C:\Users\matab\Desktop\Images souris\Trust GXT 105.jpg"),
}


def resample():
    if hasattr(Image, "Resampling"):
        return Image.Resampling.LANCZOS
    return Image.LANCZOS


def scale_to_work_image(image):
    width, height = image.size
    max_side = max(width, height)

    if max_side <= MAX_WORK_SIZE:
        return image.copy(), 1.0

    ratio = MAX_WORK_SIZE / float(max_side)
    target = (max(1, round(width * ratio)), max(1, round(height * ratio)))
    return image.resize(target, resample()), ratio


def average_color(region):
    reduced = region.resize((1, 1), Image.Resampling.BOX if hasattr(Image, "Resampling") else Image.BOX)
    return reduced.getpixel((0, 0))


def background_color(image):
    rgb = image.convert("RGB")
    width, height = rgb.size
    sample = max(8, min(width, height) // 18)
    regions = [
        rgb.crop((0, 0, sample, sample)),
        rgb.crop((width - sample, 0, width, sample)),
        rgb.crop((0, height - sample, sample, height)),
        rgb.crop((width - sample, height - sample, width, height)),
    ]
    colors = [average_color(region) for region in regions]
    return tuple(round(sum(color[index] for color in colors) / len(colors)) for index in range(3))


def near_background(pixel, bg_color):
    red, green, blue, alpha = pixel

    if alpha <= 8:
        return True

    distance = max(
        abs(red - bg_color[0]),
        abs(green - bg_color[1]),
        abs(blue - bg_color[2]),
    )
    luminance = (red + green + blue) / 3.0
    chroma = max(red, green, blue) - min(red, green, blue)

    return distance <= 42 or (distance <= 58 and luminance >= 200 and chroma <= 42)


def flood_background(image, bg_color):
    width, height = image.size
    pixels = image.load()
    visited = bytearray(width * height)
    queue = deque()

    def enqueue(x_pos, y_pos):
        index = y_pos * width + x_pos
        if visited[index]:
            return
        if not near_background(pixels[x_pos, y_pos], bg_color):
            return
        visited[index] = 1
        queue.append((x_pos, y_pos))

    for x_pos in range(width):
        enqueue(x_pos, 0)
        enqueue(x_pos, height - 1)

    for y_pos in range(height):
        enqueue(0, y_pos)
        enqueue(width - 1, y_pos)

    while queue:
        x_pos, y_pos = queue.popleft()
        if x_pos > 0:
            enqueue(x_pos - 1, y_pos)
        if x_pos + 1 < width:
            enqueue(x_pos + 1, y_pos)
        if y_pos > 0:
            enqueue(x_pos, y_pos - 1)
        if y_pos + 1 < height:
            enqueue(x_pos, y_pos + 1)

    return visited


def carve_inner_holes(image, bg_color, border_background):
    width, height = image.size
    pixels = image.load()
    mask = bytearray(width * height)
    max_hole_area = int(width * height * HOLE_AREA_RATIO_MAX)

    for y_pos in range(height):
        for x_pos in range(width):
            index = y_pos * width + x_pos
            if border_background[index]:
                mask[index] = 1

    for y_pos in range(height):
        for x_pos in range(width):
            index = y_pos * width + x_pos
            if mask[index] or not near_background(pixels[x_pos, y_pos], bg_color):
                continue

            queue = deque([(x_pos, y_pos)])
            component = []
            mask[index] = 1
            touches_edge = False

            while queue:
                current_x, current_y = queue.popleft()
                component.append((current_x, current_y))

                if (
                    current_x == 0
                    or current_y == 0
                    or current_x == width - 1
                    or current_y == height - 1
                ):
                    touches_edge = True

                if current_x > 0:
                    next_index = current_y * width + (current_x - 1)
                    if not mask[next_index] and near_background(pixels[current_x - 1, current_y], bg_color):
                        mask[next_index] = 1
                        queue.append((current_x - 1, current_y))
                if current_x + 1 < width:
                    next_index = current_y * width + (current_x + 1)
                    if not mask[next_index] and near_background(pixels[current_x + 1, current_y], bg_color):
                        mask[next_index] = 1
                        queue.append((current_x + 1, current_y))
                if current_y > 0:
                    next_index = (current_y - 1) * width + current_x
                    if not mask[next_index] and near_background(pixels[current_x, current_y - 1], bg_color):
                        mask[next_index] = 1
                        queue.append((current_x, current_y - 1))
                if current_y + 1 < height:
                    next_index = (current_y + 1) * width + current_x
                    if not mask[next_index] and near_background(pixels[current_x, current_y + 1], bg_color):
                        mask[next_index] = 1
                        queue.append((current_x, current_y + 1))

            area = len(component)
            keep_as_hole = (
                not touches_edge
                and HOLE_AREA_MIN <= area <= max_hole_area
            )

            if keep_as_hole:
                for current_x, current_y in component:
                    border_background[current_y * width + current_x] = 1

    return border_background


def build_mask(image):
    rgba = image.convert("RGBA")
    alpha_channel = rgba.getchannel("A")
    alpha_min, alpha_max = alpha_channel.getextrema()

    if alpha_min < 250:
        return alpha_channel

    work_image, ratio = scale_to_work_image(rgba)
    bg_color = background_color(work_image)
    border_background = flood_background(work_image, bg_color)
    full_background = carve_inner_holes(work_image, bg_color, border_background)

    mask = Image.new("L", work_image.size, 0)
    mask_pixels = mask.load()
    width, height = work_image.size

    for y_pos in range(height):
        row_offset = y_pos * width
        for x_pos in range(width):
            mask_pixels[x_pos, y_pos] = 0 if full_background[row_offset + x_pos] else 255

    mask = mask.filter(ImageFilter.GaussianBlur(0.9))

    if ratio != 1.0:
        mask = mask.resize(rgba.size, resample())

    return mask


def needs_processing(source_path, output_path):
    """Vérifie si le fichier doit être traité (nouveau ou modifié)."""
    if not output_path.exists():
        return True
    
    source_mtime = os.path.getmtime(source_path)
    output_mtime = os.path.getmtime(output_path)
    
    return source_mtime > output_mtime


def autocrop_white_borders(image, threshold=240):
    """Supprime les bordures blanches autour de l'image."""
    rgba = image.convert("RGBA")
    width, height = rgba.size
    pixels = rgba.load()
    
    # Trouver les limites du contenu non-blanc
    left, top = width, height
    right, bottom = 0, 0
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # Vérifier si le pixel n'est pas blanc (ou transparent)
            if a > 10 and not (r >= threshold and g >= threshold and b >= threshold):
                left = min(left, x)
                right = max(right, x)
                top = min(top, y)
                bottom = max(bottom, y)
    
    if left < right and top < bottom:
        # Ajouter une petite marge de 2 pixels
        left = max(0, left - 2)
        top = max(0, top - 2)
        right = min(width - 1, right + 2)
        bottom = min(height - 1, bottom + 2)
        return rgba.crop((left, top, right + 1, bottom + 1))
    
    return rgba


def export_asset(source_path, output_path):
    # Vérifier si le traitement est nécessaire
    if not needs_processing(source_path, output_path):
        print(f"✓ À jour: {output_path.name}")
        return
    
    image = Image.open(source_path).convert("RGBA")
    
    # Autocrop des bordures blanches avant traitement
    image = autocrop_white_borders(image)
    
    mask = build_mask(image)

    rgba = image.copy()
    rgba.putalpha(mask)
    rgba = decontaminate_edges(rgba)

    alpha_bbox = rgba.getchannel("A").getbbox()
    if not alpha_bbox:
        raise RuntimeError(f"No visible content detected for {source_path.name}")

    cropped = rgba.crop(alpha_bbox)
    width, height = cropped.size
    scale = min(
        (TARGET_SIZE - (PADDING * 2)) / float(width),
        (TARGET_SIZE - (PADDING * 2)) / float(height),
    )
    resized = cropped.resize(
        (max(1, round(width * scale)), max(1, round(height * scale))),
        resample(),
    )

    canvas = Image.new("RGBA", (TARGET_SIZE, TARGET_SIZE), (0, 0, 0, 0))
    offset = (
        (TARGET_SIZE - resized.size[0]) // 2,
        (TARGET_SIZE - resized.size[1]) // 2,
    )
    canvas.alpha_composite(resized, offset)
    
    # Export WebP avec compression 80%
    canvas.save(output_path, format="WEBP", quality=WEBP_QUALITY, method=6)
    print(f"✓ Exporté: {output_path.name}")


def decontaminate_edges(image):
    rgba = image.copy()
    pixels = rgba.load()
    width, height = rgba.size

    for y_pos in range(height):
        for x_pos in range(width):
            red, green, blue, alpha = pixels[x_pos, y_pos]

            if alpha == 0 or alpha == 255:
                continue

            opacity = alpha / 255.0
            pixels[x_pos, y_pos] = (
                max(0, min(255, round((red - (255 * (1.0 - opacity))) / opacity))),
                max(0, min(255, round((green - (255 * (1.0 - opacity))) / opacity))),
                max(0, min(255, round((blue - (255 * (1.0 - opacity))) / opacity))),
                alpha,
            )

    return rgba


def main():
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    
    processed = 0
    skipped = 0
    
    for base_name, source_path in INPUTS.items():
        # Changement d'extension vers .webp
        output_name = f"{base_name}.webp"
        output_path = ASSETS_DIR / output_name
        
        if needs_processing(source_path, output_path):
            export_asset(source_path, output_path)
            processed += 1
        else:
            skipped += 1
    
    print(f"\n{'='*50}")
    print(f"Traitement terminé: {processed} exporté(s), {skipped} à jour")
    print(f"Format: WebP qualité {WEBP_QUALITY}%")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()
