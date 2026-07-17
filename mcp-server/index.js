import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

// Inicializar el servidor MCP
const server = new Server(
    { name: "context-manager-mcp", version: "1.0.0" },
    { capabilities: { tools: {} } }
);

// Definir las herramientas disponibles para el Agente
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "search_context",
                description: "Busca un término específico en todos los archivos de la carpeta /context.",
                inputSchema: {
                    type: "object",
                    properties: {
                        keyword: { type: "string", description: "La palabra o término a buscar" }
                    },
                    required: ["keyword"],
                },
            },
            {
                name: "get_cluster_status",
                description: "Obtiene el estado en tiempo real de los contenedores o pods del entorno local.",
                inputSchema: {
                    type: "object",
                    properties: {},
                    required: [],
                },
            }
        ],
    };
});

// Lógica de ejecución de las herramientas
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === "search_context") {
        try {
            // Usa grep para buscar recursivamente en la carpeta context
            const { stdout } = await execPromise(`grep -ri "${args.keyword}" ./context`);
            return { toolResult: stdout || "No se encontraron coincidencias." };
        } catch (error) {
            return { toolResult: "No se encontraron coincidencias o hubo un error en la búsqueda." };
        }
    }

    if (name === "get_cluster_status") {
        try {
            // Ajusta este comando (docker ps, kubectl get pods, etc.) según tu entorno activo
            const { stdout } = await execPromise("docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'");
            return { toolResult: stdout };
        } catch (error) {
            return { toolResult: `Error leyendo el estado del cluster: ${error.message}` };
        }
    }

    throw new Error(`Tool no encontrada: ${name}`);
});

// Iniciar el transporte por STDIO
async function run() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Context-Manager MCP Server iniciado correctamente en modo STDIO.");
}

run().catch(console.error);