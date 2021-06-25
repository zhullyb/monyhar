# README.md for Open Screen Library in Monyhar

openscreen is built in Monyhar with some build differences.  The files that are
built in openscreen are determined by the following build variables.

 - `build_with_monyhar`: `true` when building as part of a Monyhar checkout,
 `false` otherwise.  Defined `//build_overrides/build.gni` in Monyhar.
 - `use_mdns_responder`: `true` by default, `false` when `build_with_monyhar`
 is `true`.  Controls whether the default mDNSResponder mDNS implementation is
 used.  Set by `openscreen/src/build/config/services.gni.`
 - `use_monyhar_quic`: `true` by default, `false` when `build_with_monyhar` is
 `true`.  Controls whether the Monyhar-derived QUIC implementation in
 openscreen is used.  Set by `openscreen/src/build/config/services.gni`.
