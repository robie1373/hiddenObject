Convert all .jpg files in a directory to .png

```
for i in *.jpg; do sips -s format png $i --out `echo $i | cut -d. -f1`.png ; done
```

Turn the background (as long as it is a solid color. White in the example below) transparent.

```
for i in *.png; do convert $i -transparent white ../$i; done
```

Resize all .png images in a directory to $x pixels max in either dimension. E.G. $x = 200

```
sips -Z $x *.png
```
