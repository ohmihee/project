#!/bin/bash

TOPDIR=${TOPDIR:-$(git rev-parse --show-toplevel)}
SRCDIR=${SRCDIR:-$TOPDIR/src}
MANDIR=${MANDIR:-$TOPDIR/doc/man}

INGCOIND=${INGCOIND:-$SRCDIR/ingcoind}
INGCOINCLI=${INGCOINCLI:-$SRCDIR/ingcoin-cli}
INGCOINTX=${INGCOINTX:-$SRCDIR/ingcoin-tx}
INGCOINQT=${INGCOINQT:-$SRCDIR/qt/ingcoin-qt}

[ ! -x $INGCOIND ] && echo "$INGCOIND not found or not executable." && exit 1

# The autodetected version git tag can screw up manpage output a little bit
INGVER=($($INGCOINCLI --version | head -n1 | awk -F'[ -]' '{ print $6, $7 }'))

# Create a footer file with copyright content.
# This gets autodetected fine for bitcoind if --version-string is not set,
# but has different outcomes for bitcoin-qt and bitcoin-cli.
echo "[COPYRIGHT]" > footer.h2m
$INGCOIND --version | sed -n '1!p' >> footer.h2m

for cmd in $INGCOIND $INGCOINCLI $INGCOINTX $INGCOINQT; do
  cmdname="${cmd##*/}"
  help2man -N --version-string=${INGVER[0]} --include=footer.h2m -o ${MANDIR}/${cmdname}.1 ${cmd}
  sed -i "s/\\\-${INGVER[1]}//g" ${MANDIR}/${cmdname}.1
done

rm -f footer.h2m