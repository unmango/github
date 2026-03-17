_ := $(shell mkdir -p .make)

DPRINT        ?= dprint
FLAKE_CHECKER ?= flake-checker
NIX           ?= nix
PULUMI        ?= pulumi
YARN          ?= yarn

PULUMI_FLAGS ?=

TS_SRC != find . -name '*.ts' -not -path '**/node_modules/**'
JS_SRC != find . \( -name '*.js' -o -name '*.mjs' \) -not -path '**/node_modules/**'

.PHONY: preview diff up refresh stack lint format install update

up: install stack
	$(PULUMI) up --refresh $(PULUMI_FLAGS)

preview: install stack
	$(PULUMI) preview --refresh $(PULUMI_FLAGS)

diff: install stack
	$(PULUMI) preview --diff --refresh $(PULUMI_FLAGS)

refresh: install stack
	$(PULUMI) refresh

lint: install
	$(YARN) eslint .

update:
	$(NIX) flake update

check:
	$(NIX) flake check
	$(FLAKE_CHECKER) flake.lock

install: .make/pulumi_install
stack: .make/stack_select_prod
format fmt: .make/format .make/nix_fmt

.envrc: hack/example.envrc
	cp $< $@

.make/pulumi_install: yarn.lock
	$(PULUMI) install
	@touch $@

.make/stack_select_prod:
	$(PULUMI) stack select prod
	@touch $@

.make/format: ${TS_SRC} ${JS_SRC}
	$(DPRINT) fmt $?
	@touch $@

.make/nix_fmt: $(wildcard *.nix)
	$(NIX) fmt
	@touch $@
