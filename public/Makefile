NPM_CMD ?= npm

default: build run

compile:
	$(NPM_CMD) run tsc

clean:
	$(NPM_CMD) run clean

run:
	$(NPM_CMD) run start

build: clean
	$(NPM_CMD) run webpack
