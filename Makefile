.PHONY: say_hello
say_hello:
	@echo "hello world"
.PHONY: build_chunks
build_chunks:
	@node -r @babel/register ./split-client-blocks.js