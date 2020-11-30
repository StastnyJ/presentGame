 
all: compile

clean:
	rm -rf dist/

compile:
	make clean
	mkdir dist
	cp public/* dist
	tsc  --skipLibCheck --outFile dist/game.js -lib dom,es6 src/main.ts

.PHONY: clean compile
.SILENT: