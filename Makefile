_ := $(shell mkdir -p .make)

PULUMI := ${CURDIR}/bin/pulumi

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
	yarn eslint .

format fmt: .make/format

bin/dprint: .versions/dprint | .make/dprint/install.sh
	DPRINT_INSTALL=${CURDIR} .make/dprint/install.sh $(shell cat .versions/dprint)
	@touch $@

bin/pulumi: .versions/pulumi
	curl -fsSL https://get.pulumi.com | sh -s -- --install-root ${CURDIR} --version $(shell cat $<) --no-edit-path

.envrc: hack/example.envrc
	cp $< $@

.make/dprint/install.sh:
	@mkdir -p $(dir $@)
	curl -fsSL https://dprint.dev/install.sh -o $@
	@chmod +x $@

.make/pulumi_install: yarn.lock | bin/pulumi
	$(PULUMI) install
	@touch $@

.make/stack_select_prod:
	pulumi stack select prod
	@touch $@

.make/format: $(shell find . -name '*.ts' -not -path '**/node_modules/**')
	dprint fmt $?
	@touch $@
