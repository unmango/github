_ := $(shell mkdir -p .make)

PULUMI_FLAGS ?=

TS_SRC != find . -name '*.ts' -not -path '**/node_modules/**'
JS_SRC != find . \( -name '*.js' -o -name '*.mjs' \) -not -path '**/node_modules/**'

.PHONY: preview diff up refresh stack lint format install update

up: install stack
	pulumi up --refresh $(PULUMI_FLAGS)

preview: install stack
	pulumi preview --refresh $(PULUMI_FLAGS)

diff: install stack
	pulumi preview --diff --refresh $(PULUMI_FLAGS)

refresh: install stack
	pulumi refresh

lint: install
	yarn eslint .

update:
	nix flake update

install: .make/pulumi_install
stack: .make/stack_select_prod
format fmt: .make/format .make/nix_fmt

.envrc: hack/example.envrc
	cp $< $@

.nvmrc: flake.lock
	node --version | cut -c2- > $@

.make/pulumi_install: yarn.lock
	pulumi install
	@touch $@

.make/stack_select_prod:
	pulumi stack select prod
	@touch $@

.make/format: ${TS_SRC} ${JS_SRC}
	$(DPRINT) fmt $?
	@touch $@

.make/nix_fmt: $(wildcard *.nix)
	nix fmt
	@touch $@
