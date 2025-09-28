#!/usr/bin/env bash
set -e
mkdir -p public/assets/images
echo "Downloading sample real photos from Unsplash (one-shot random images matching the query)."
curl -L "https://source.unsplash.com/1600x900/?morocco,stadium" -o public/assets/images/stadium.jpg
curl -L "https://source.unsplash.com/1600x900/?morocco,fans" -o public/assets/images/fans.jpg
curl -L "https://source.unsplash.com/1600x900/?casablanca,skyline" -o public/assets/images/casablanca.jpg
curl -L "https://source.unsplash.com/1600x900/?morocco,flag" -o public/assets/images/flag.jpg
curl -L "https://source.unsplash.com/1600x900/?morocco,city" -o public/assets/images/city.jpg
echo "Done. Images saved to public/assets/images/"
echo "Unsplash images: please credit photographers when using publicly. See https://unsplash.com/license"
