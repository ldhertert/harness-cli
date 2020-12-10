import https from 'https'
import { TLSSocket, DetailedPeerCertificate } from 'tls'

async function getCerts(host: string) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    const options = {
        host: host,
        port: 443,
        method: 'GET',
    }
    return new Promise<string[]>(resolve => {
        const request = https.request(options, res => {
            let cert = (res.connection as TLSSocket).getPeerCertificate(true)
            const list = new Set<DetailedPeerCertificate>()
            do {
                list.add(cert)
                cert = cert.issuerCertificate
            } while (cert && typeof cert === 'object' && !list.has(cert))

            const certs = [...list].map(c => {
                const prefix = '-----BEGIN CERTIFICATE-----\n'
                const postfix = '-----END CERTIFICATE-----'
                const pemText = prefix + c.raw.toString('base64').match(/.{0,64}/g)?.join('\n') + postfix
                return pemText
            })
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = ''            
            resolve(certs)
        })

        request.end()
    })
}

async function getRoot(host: string) {
    const certs = await getCerts(host)
    return certs.length > 0 ? certs[certs.length - 1] : undefined
}

async function getCert(host: string) {
    const certs = await getCerts(host)
    return certs.length > 0 ? certs[0] : undefined
}

async function getChain(host: string) {
    const certs = await getCerts(host)
    return certs.join('\n')
}

// Add cert to OS trust store
// Debian
// cp ./cacert.pem /usr/share/ca-certificates/cacert.crt
// echo cacert.crt >> /etc/ca-certificates.conf
// dpkg-reconfigure ca-certificates

const Certificates = { getRoot, getCert, getChain }
export default Certificates