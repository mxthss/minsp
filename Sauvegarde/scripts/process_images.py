#!/usr/bin/env python3
"""
Script pour traiter les images produits :
- Redimensionner en 500x500
- Supprimer le fond (rendre transparent)
- Sauvegarder en WebP avec transparence
"""

from PIL import Image
import os
import sys

# Chemins
INPUT_DIR = r"C:\Users\matab\Documents\New project\image a transferer dans asset"
OUTPUT_DIR = r"C:\Users\matab\Documents\New project\assets"

# Mapping des fichiers vers leur destination
FILE_MAPPING = {
    # Claviers
    "ATK HEX 80.webp": ("keyboards", "atk-hex-80.webp"),
    "apex pro tkl gen 3.jpg": ("keyboards", "apex-pro-tkl-gen-3.webp"),
    
    # PC Components
    "deepcool cg 530 4f.jpg": ("pc-components", "deepcool-cg530-4f.webp"),
    "gigabyte_aorus_geforce_rtx_5090_master.jpg": ("pc-components", "rtx-5090-aorus-master.webp"),
    "ryzen 7 9800x3d.jpg": ("pc-components", "ryzen-7-9800x3d.webp"),
    "patriot viper venom.png": ("pc-components", "patriot-viper-venom.webp"),
    "b850 aorus elite wifi 7.jpg": ("pc-components", "b850-aorus-elite-wifi-7.webp"),
    "samsung 990 pro.jpg": ("pc-components", "samsung-990-pro.webp"),
    "lian li edge 1200w.jpg": ("pc-components", "lian-li-edge-1200w.webp"),
    "asis horse down pro.avif": ("pc-components", "asia-horse-down-pro.webp"),
    "arctic liquid freezer iii.jpg": ("pc-components", "arctic-liquid-freezer-iii.webp"),
}

def remove_background_simple(img):
    """
    Version simple : convertir en RGBA si nécessaire
    Pour une vraie suppression de fond, il faudrait utiliser rembg ou un modèle ML
    """
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    return img

def process_image(input_path, output_path, size=(500, 500)):
    """Traiter une image : resize et sauvegarde"""
    try:
        with Image.open(input_path) as img:
            # Convertir en RGBA pour la transparence
            img = img.convert('RGBA')
            
            # Redimensionner en gardant le ratio
            img.thumbnail(size, Image.Resampling.LANCZOS)
            
            # Créer une image 500x500 avec fond transparent
            final_img = Image.new('RGBA', size, (0, 0, 0, 0))
            
            # Calculer la position pour centrer
            x = (size[0] - img.width) // 2
            y = (size[1] - img.height) // 2
            
            # Coller l'image redimensionnée
            final_img.paste(img, (x, y), img)
            
            # Sauvegarder en WebP avec transparence
            final_img.save(output_path, 'WEBP', quality=90)
            print(f"[OK] {os.path.basename(output_path)}")
            return True
            
    except Exception as e:
        print(f"[ERR] Erreur avec {os.path.basename(input_path)}: {e}")
        return False

def main():
    print("Traitement des images produits...")
    print(f"Input: {INPUT_DIR}")
    print(f"Output: {OUTPUT_DIR}")
    print()
    
    success_count = 0
    
    for input_file, (category, output_file) in FILE_MAPPING.items():
        input_path = os.path.join(INPUT_DIR, input_file)
        
        # Créer le dossier de sortie si nécessaire
        category_dir = os.path.join(OUTPUT_DIR, category)
        os.makedirs(category_dir, exist_ok=True)
        
        output_path = os.path.join(category_dir, output_file)
        
        if os.path.exists(input_path):
            if process_image(input_path, output_path):
                success_count += 1
        else:
            print(f"[MISSING] Fichier non trouve: {input_file}")
    
    print()
    print(f"{success_count}/{len(FILE_MAPPING)} images traitées avec succès")

if __name__ == "__main__":
    main()
