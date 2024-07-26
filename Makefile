_ := $(shell mkdir -p .make)

.PHONY: preview diff up stack lint format install

preview: install stack
	pulumi preview

diff: install stack
	pulumi preview --diff

up: install stack
	pulumi up


lint: install
	yarn eslint .

format: .make/format

install: .make/yarn_install
.make/yarn_install: yarn.lock
	yarn install
	@touch $@

stack: .make/stack_select_prod
.make/stack_select_prod:
	pulumi stack select prod
	@touch $@

.make/format: $(shell find . -name '*.ts' -not -path '**/node_modules/**')
	dprint fmt $^
	@touch $@
