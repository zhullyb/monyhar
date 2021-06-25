// Copyright (c) 2012 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "net/quic/quic_monyhar_connection_helper.h"
#include "base/no_destructor.h"

namespace net {

namespace {
quic::QuicBufferAllocator* GetBufferAllocator() {
  static base::NoDestructor<quic::SimpleBufferAllocator> allocator;
  return &*allocator;
}
}  // namespace

QuicMonyharConnectionHelper::QuicMonyharConnectionHelper(
    const quic::QuicClock* clock,
    quic::QuicRandom* random_generator)
    : clock_(clock), random_generator_(random_generator) {}

QuicMonyharConnectionHelper::~QuicMonyharConnectionHelper() {}

const quic::QuicClock* QuicMonyharConnectionHelper::GetClock() const {
  return clock_;
}

quic::QuicRandom* QuicMonyharConnectionHelper::GetRandomGenerator() {
  return random_generator_;
}

quic::QuicBufferAllocator*
QuicMonyharConnectionHelper::GetStreamSendBufferAllocator() {
  return GetBufferAllocator();
}

}  // namespace net
