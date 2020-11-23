suf="dist/*"
pref="../public/Minigames/"
for i in $(ls -d */); do cp $i$suf $pref$i; done