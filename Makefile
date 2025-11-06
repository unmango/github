_ := $(shell mkdir -p .make)

DPRINT ?= dprint
NIX    := nix
PULUMI ?= bin/pulumi
YARN   ?= yarn

TS_SRC != find . -name '*.ts' -not -path '**/node_modules/**'
JS_SRC != find . \( -name '*.js' -o -name '*.mjs' \) -not -path '**/node_modules/**'

.PHONY: preview diff up refresh stack lint format install

up: install stack | bin/pulumi
	$(PULUMI) up

preview: install stack | bin/pulumi
	$(PULUMI) preview

diff: install stack | bin/pulumi
	$(PULUMI) preview --diff

refresh: install stack | bin/pulumi
	$(PULUMI) refresh

install: .make/pulumi_install
stack: .make/stack_select_prod

lint: install
	$(YARN) eslint .

format fmt: .make/format .make/nix_fmt
update: flake.lock

flake.lock: flake.nix
	$(NIX) flake update

$(PULUMI): .versions/pulumi
	curl -fsSL https://get.pulumi.com | sh -s -- --install-root ${CURDIR} --version $(shell cat $<) --no-edit-path

.envrc: hack/example.envrc
	cp $< $@

.make/pulumi_install: yarn.lock | bin/pulumi
	$(PULUMI) install
	@touch $@

.make/stack_select_prod: | bin/pulumi
	$(PULUMI) stack select prod
	@touch $@

.make/format: ${TS_SRC} ${JS_SRC}
	$(DPRINT) fmt $?
	@touch $@

.make/nix_fmt: $(wildcard *.nix)
	$(NIX) fmt
	@touch $@
