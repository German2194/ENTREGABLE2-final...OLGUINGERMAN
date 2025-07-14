/ data.js - Datos estáticos simulados en formato JSON
const securityData = {
    // Base de datos de vulnerabilidades conocidas
    vulnerabilities: [
        {
            id: 1,
            name: "SQL Injection",
            severity: "critical",
            description: "Vulnerabilidad crítica en la base de datos que permite inyección de código SQL",
            ip: "192.168.1.100",
            port: 3306,
            solution: "Implementar prepared statements y validación de entrada",
            cve: "CVE-2023-0001",
            affected_service: "MySQL Database"
        },
        {
            id: 2,
            name: "Cross-Site Scripting (XSS)",
            severity: "high",
            description: "Script malicioso detectado en formularios web",
            ip: "192.168.1.102",
            port: 80,
            solution: "Validar y sanitizar todas las entradas del usuario",
            cve: "CVE-2023-0002",
            affected_service: "Web
