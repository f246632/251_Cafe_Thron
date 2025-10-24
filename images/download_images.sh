#!/bin/bash
# Download images from Google URLs
urls=(
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4novRUVQMTzeIlzQjrE475J7LjMmB4Ont3ynNi8qacqt15sVrxCqrWuMPuI1dnvQOXwsxa1ki3QC6QYG2ThCzwTkOpOybK2bezcDR_ANFLLn2URimYnnsNo3sOS8Q_npK6DBj1hEiA=w408-h299-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyDMzoZKQGUe_RMoL855OTwqWYrKfga3R-RG3VgasNi-T1CAdeQ2KrCh9x_KdCn0t6z70OwyZzkhp0h-ZlCMUmQhDUCeI8vVkdMtZUePaH5pexBMXFFL9If28fN9aiUbUegJQplEg=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyLUYLeHoIIi7aQfnijbUsJRarp76KOf0MDbn3rLw31TivsfV2nHfo-IxqvOFbqfUMUmk5S1nPMyCw7yD4x6xNcCDYZMtME93mx8e_PcwglQD4z1bYhqHSULkR76fXUZr6mBtLW=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzzgTgY6cKbT9VF-7phHAP_g6_yctylEs_ZaML4s0DhuhUkk3C0w2bJxuTezewSxRc4c8lwWf-ed77AvXdrWQ8CObmxUKk2G-KLcu5SF8QbRC6Y-2t1JL2Qq_Q7XRj4PlBEzgek=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzm-cMxZqhDwLR62aRPc8UrWSbcXpZahNJ2lv3x2AZhitY7KYpPKmGHpR9oX0MtCdfba1MKEmWfkc78PinrM-IrhYiTjscvf3gjrBkHtlwlrJxkuJ1udEUCCeN7cMz41nYRLgPp=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwX8rkU_og21PaRQUYRfNXy1Qn6PU660LoCvirOGeuzq9heTFRr_kajtDCYZi-KKnWgiQPOTmpYMgjx9tUin311vjMhIp0bL-i7fBYGLcy3ySri-u73_ThzNKWt_PePnmnUO60=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyrkca6-euvM3xaqYF71GCYNlIqglYS7HE90Jb52VNqD3Ck1XcgXPng1Yc_jLtFlYVxvaBZH_aettWyAAdp8extvK0QYc0E5gwNRkSLlbkR4iWZBl5EQadmSebroNZ_76Ox5aU=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxTb54dlijLBVn3nU_j7JC_2oBm4iL6H2lg7L-twFWSNG9LnYv718Ht6ASHHszWEz1pFPIjTPJofOX7rbUnTfAE-Mq8k1F3YRj-Wg09zYJAH5dmj9ix8F24Oeb3offKb07bPjSA=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSz2GJ5HTqJzWRiXob-BXCOXzbRCFyb2ZwEZZ7NN35ywjcapbwXRQzsixdDopBMIRL1MJM2lQ-i_xaujC1Q4nwWnnAEJBJ2iJcU6tt1e8h_N3B8iQnYjGObHEIGhKX6VU5HB2PPLvw=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxy7FVkF7vl6vxgIh6nI2GZ_d2kiWIZGxXkppjXVXF1oLTy_PIFVTgq4UW-OwxdVOeBX1ELWUimCBoGVuhU1AAO_ixeZkOtlWYIm7Gpbk24KNdIoXcdu1fCyAamHQDKuPqLK911=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyscJFLRlG6tbikXnFicbr44EvNgaee90iRDjrLQ0r_d7t4AoCfYqSPYzM7z1nKgURIL4gP3bLzkJ8aRfX5VDHF1W9vy3KN91iEXMMgVcLT0ZwISulvYnR7B9end1f9m-E5diD1ew=w1920-h1080-k-no"
)

i=1
for url in "${urls[@]}"; do
  echo "Downloading image $i..."
  curl -s -o "source/cafe-$i.jpg" "$url"
  i=$((i+1))
done
echo "Download complete!"
