// Copyright (c) 2012 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//
// The Chrome-specific helper for quic::QuicConnection which uses
// a TaskRunner for alarms, and uses a DatagramClientSocket for writing data.

#ifndef NET_QUIC_QUIC_CHROMIUM_CONNECTION_HELPER_H_
#define NET_QUIC_QUIC_CHROMIUM_CONNECTION_HELPER_H_

#include "base/macros.h"
#include "net/base/ip_endpoint.h"
#include "net/base/net_export.h"
#include "net/socket/datagram_client_socket.h"
#include "net/third_party/quiche/src/quic/core/quic_connection.h"
#include "net/third_party/quiche/src/quic/core/quic_packets.h"
#include "net/third_party/quiche/src/quic/core/quic_simple_buffer_allocator.h"
#include "net/third_party/quiche/src/quic/core/quic_time.h"

namespace quic {
class QuicClock;

class QuicRandom;
}  // namespace quic
namespace net {

class NET_EXPORT_PRIVATE QuicMonyharConnectionHelper
    : public quic::QuicConnectionHelperInterface {
 public:
  QuicMonyharConnectionHelper(const quic::QuicClock* clock,
                               quic::QuicRandom* random_generator);
  ~QuicMonyharConnectionHelper() override;

  // quic::QuicConnectionHelperInterface
  const quic::QuicClock* GetClock() const override;
  quic::QuicRandom* GetRandomGenerator() override;
  quic::QuicBufferAllocator* GetStreamSendBufferAllocator() override;

 private:
  const quic::QuicClock* clock_;
  quic::QuicRandom* random_generator_;

  DISALLOW_COPY_AND_ASSIGN(QuicMonyharConnectionHelper);
};

}  // namespace net

#endif  // NET_QUIC_QUIC_CHROMIUM_CONNECTION_HELPER_H_
