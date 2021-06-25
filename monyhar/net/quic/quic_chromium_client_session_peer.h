// Copyright (c) 2013 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef NET_QUIC_QUIC_CHROMIUM_CLIENT_SESSION_PEER_H_
#define NET_QUIC_QUIC_CHROMIUM_CLIENT_SESSION_PEER_H_

#include <stddef.h>

#include <string>

#include "base/macros.h"
#include "net/third_party/quiche/src/quic/core/quic_packets.h"

namespace net {

class QuicMonyharClientSession;
class QuicMonyharClientStream;

namespace test {

class QuicMonyharClientSessionPeer {
 public:
  static void SetHostname(QuicMonyharClientSession* session,
                          const std::string& hostname);

  static uint64_t GetPushedBytesCount(QuicMonyharClientSession* session);

  static uint64_t GetPushedAndUnclaimedBytesCount(
      QuicMonyharClientSession* session);

  static QuicMonyharClientStream* CreateOutgoingStream(
      QuicMonyharClientSession* session);

  static bool GetSessionGoingAway(QuicMonyharClientSession* session);

  static bool DoesSessionAllowPortMigration(QuicMonyharClientSession* session);

 private:
  DISALLOW_COPY_AND_ASSIGN(QuicMonyharClientSessionPeer);
};

}  // namespace test
}  // namespace net

#endif  // NET_QUIC_QUIC_CHROMIUM_CLIENT_SESSION_PEER_H_
