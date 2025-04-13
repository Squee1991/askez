import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
    // Set proper MIME types for JavaScript modules
    if (event.node.req.url.endsWith('.js')) {
        event.node.res.setHeader('Content-Type', 'application/javascript')
    }
    if (event.node.req.url.endsWith('.mjs')) {
        event.node.res.setHeader('Content-Type', 'application/javascript')
    }
}) 