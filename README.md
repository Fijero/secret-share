# secretshare

> Share `.env` files securely via terminal — encrypted before leaving your machine.

## Install

```bash
npm i secret-share-cli
```

## Usage

### Push

```bash
secretshare push .env
secretshare push .env.production
secretshare push .env --ttl 12
secretshare push .env --project erranly-backend
secretshare push .env --no-once
```

### Pull

```bash
secretshare pull ABC12345.9b72e950...
secretshare pull ABC12345.9b72e950... --output .env.production
```


## Related

- [secret-share-backend](https://github.com/Fijero/secret-share-backend) — The Go server