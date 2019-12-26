# HomeKit Based Pairings

Default code is `3939`.


## Transient Pairing

`POST /pair-setup`
`EncryptionKey` is `SRP shared secret`

## Normal Pairing

`POST /pair-setup`
`POST /pair-verify`

`EncryptionKey` is agreed `SessionKey`

## Encryption

After successful pairing the connection switches to being encrypted using
the format `N:n_bytes:tag` where `N` is a 16 bit Little Endian length that
describes the number of bytes in `n_bytes` and `n_bytes` is encrypted using
ChaCha20-Poly1305 with `tag` being the Poly1305 tag.

Each direction uses its own key and nonce.

The key for data sent from client to accessory is a HKDF-SHA-512 with the
following parameters:

```
InputKey = <EncryptionKey>
Salt = ”Control-Salt”
Info = ”Control-Write-Encryption-Key”
OutputSize = 32 bytes
```

While the data sent from accessory to client is HKDF-SHA-512 with the following
parameters:

```
InputKey = <EncryptionKey>
Salt = ”Control-Salt”
Info = ”Control-Read-Encryption-Key”
OutputSize = 32 bytes
```

The nonce is a 64 bit counter (i.e. the high order bits of the full 96 bit
nonce is set to 0) starting with 0 and incrementing by 1 for each encrypted
block.
