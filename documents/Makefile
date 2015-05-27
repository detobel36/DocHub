FINAL_PDF = $(shell cat .dochub)
ORIGINAL_TEX = $(subst .pdf,.tex,${FINAL_PDF})
OTHER_TEX = $(shell grep '\\input' "${ORIGINAL_TEX}" | sed -E 's/.*\\input\{(.+)\}.*/\1/')
FIGURES = $(shell grep '\\includegraphics' "${ORIGINAL_TEX}" ${OTHER_TEX} | sed -E 's/.*\\includegraphics\{(.+)\}.*/\1/')

all: ${FINAL_PDF}

${FINAL_PDF}: ${ORIGINAL_TEX} ${FIGURES} ${OTHER_TEX}
	echo ${FIGURES}
	pdflatex ${PDFLATEX_OPTS} $< || cat $(subst .pdf,.log,$@)
	pdflatex ${PDFLATEX_OPTS} $<
	pdflatex ${PDFLATEX_OPTS} $<

PDFLATEX_OPTS = -halt-on-error -interaction batchmode

.PHONY: clean mrproper

%.tex: %.md
	lunamark -t latex < $< > $@

%.eps: %.dia
	dia -e $@ $<

%.eps: %.dot
	dot -Teps < $< > $@

clean:
	rm -f *.out *.aux *.log

mrproper: clean
	rm -f *.pdf

