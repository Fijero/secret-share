# SecretShare

Securely share secrets through a command-line interface.

SecretShare allows you to encrypt sensitive values locally, send the encrypted payload to a remote server, and generate a short-lived share code that another person can use to retrieve the secret.

The server never needs to receive your plaintext secret.

## Features

* 🔐 Client-side encryption
* 🚀 Simple CLI interface
* ⏳ Configurable expiration time (TTL)
* 🔗 Short share codes
* 🗑️ Optional one-time secrets
* 📦 Lightweight Node.js CLI
* 🌐 Works with a remote SecretShare backend

## Installation

Install globally with npm:

```bash
npm install -g secretshare-cli
```

Verify the installation:

```bash
secretshare --help
```

## Usage

### Push a secret

Share a secret with:

```bash
secretshare push "my-super-secret"
```

The CLI encrypts the secret and sends the encrypted data to the SecretShare server.

You will receive a share code that can be used to retrieve the secret.

Example:

```text
Secret pushed successfully!

Share code:
abc123.xYz789...

To retrieve:
secretshare pull abc123.xYz789...
```

### Pull a secret

Use the share code to retrieve a secret:

```bash
secretshare pull "abc123.xYz789..."
```

The secret is decrypted locally and displayed in your terminal.

## Expiration (TTL)

Secrets can have a configurable time-to-live.

For example, to make a secret expire after 12 hours:

```bash
secretshare push "my-secret" --ttl 12
```

The TTL is specified in hours.

Example:

```bash
secretshare push "temporary-password" --ttl 24
```

This makes the secret available for 24 hours.

## One-Time Secrets

You can create a secret that can only be retrieved once:

```bash
secretshare push "temporary-secret" --once
```

After the secret is successfully retrieved, it is deleted from the server.

This is useful for sharing:

* Temporary passwords
* API keys
* Access tokens
* Credentials
* One-time configuration values

## Security Model

SecretShare is designed so that sensitive data is encrypted before it leaves your machine.

The general flow is:

```text
Your machine
     │
     │ plaintext secret
     ▼
SecretShare CLI
     │
     │ encrypt locally
     ▼
Encrypted secret
     │
     │ HTTPS
     ▼
SecretShare Server
     │
     │ stores encrypted data
     ▼
Redis
```

When the recipient pulls the secret:

```text
Recipient
     │
     │ share code
     ▼
SecretShare Server
     │
     │ encrypted secret
     ▼
SecretShare CLI
     │
     │ decrypt locally
     ▼
Plaintext secret
```

The server stores the encrypted payload rather than the original plaintext secret.

## CLI Commands

### Push

```bash
secretshare push <secret>
```

Push a secret to the server.

### Pull

```bash
secretshare pull <share-code>
```

Retrieve and decrypt a shared secret.

### Help

```bash
secretshare --help
```

You can also get help for individual commands:

```bash
secretshare push --help
```

```bash
secretshare pull --help
```

## Options

### `--ttl`

Controls how long the secret remains available.

```bash
secretshare push "my-secret" --ttl 12
```

The value is specified in hours.

### `--once`

Makes the secret available for a single successful retrieval.

```bash
secretshare push "my-secret" --once
```

## Requirements

* Node.js 18+
* npm

## Development

Clone the repository:

```bash
git clone https://github.com/fijero/secret-share.git
cd secret-share
```

Install dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

Run the CLI locally:

```bash
node dist/index.js --help
```

## Configuration

SecretShare uses the SecretShare backend API.

If you are developing locally, configure the backend URL using an environment variable:

```bash
export SERVER_URL="http://localhost:8080"
```

For production:

```bash
export SERVER_URL="https://secretshare.fijero.dev"
```

You can also place it in a `.env` file:

```env
SERVER_URL=https://secretshare.fijero.dev
```

## Example

A typical workflow:

### Sender

```bash
secretshare push "DATABASE_PASSWORD=super-secret-password" --ttl 24 --once
```

Output:

```text
Share code:
abc123.xYz789...
```

Send the generated share code to the recipient.

### Recipient

```bash
secretshare pull "abc123.xYz789..."
```

The CLI retrieves the encrypted payload and decrypts it locally.

## Important Security Notes

Treat your share code like a secret.

Anyone who possesses a valid share code may be able to retrieve the corresponding encrypted payload and, depending on the encryption design, decrypt it.

For sensitive information:

* Share codes should be transmitted through a trusted channel.
* Use `--once` when appropriate.
* Use a short TTL for temporary secrets.
* Never commit secrets or share codes to source control.
* Do not paste production credentials into shell history when avoidable.

## License

MIT
