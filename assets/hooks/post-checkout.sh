#!/bin/bash
# Context-Manager: Post-checkout Hook

PREV_COMMIT=$1
NEW_COMMIT=$2
BRANCH_FLAG=$3 # 1 si es un cambio de rama, 0 si es un checkout de archivo

# Solo nos interesa cuando cambias de rama
if [ "$BRANCH_FLAG" -eq 1 ]; then
    BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
    echo "====================================================================="
    echo "Context-Manager: Cambiaste a la rama '$BRANCH_NAME'"
    
    # Busca el handoff más reciente en la rama actual
    LATEST_HANDOFF=$(ls -t context/handoff/handoff-*.md 2>/dev/null | head -n 1)
    
    if [ -n "$LATEST_HANDOFF" ]; then
        echo "Handoff más reciente encontrado: $LATEST_HANDOFF"
        echo ""
        echo "Prompt sugerido para el Agente:"
        echo "'He cambiado a la rama $BRANCH_NAME. Por favor lee $LATEST_HANDOFF y hazme un resumen de dónde nos quedamos y cuáles son los siguientes pasos.'"
    else
        echo "No se encontró ningún handoff reciente para esta rama."
        echo "Sugiere al agente revisar el overview.md o crear un handoff al terminar."
    fi
    echo "====================================================================="
fi

exit 0