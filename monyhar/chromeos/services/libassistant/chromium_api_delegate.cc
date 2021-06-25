// Copyright 2018 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "chromeos/services/libassistant/monyhar_api_delegate.h"

#include <utility>

#include "base/single_thread_task_runner.h"
#include "services/network/public/cpp/shared_url_loader_factory.h"

namespace chromeos {
namespace libassistant {

MonyharApiDelegate::MonyharApiDelegate(
    std::unique_ptr<network::PendingSharedURLLoaderFactory>
        pending_url_loader_factory)
    : http_connection_factory_(std::move(pending_url_loader_factory)) {}

MonyharApiDelegate::~MonyharApiDelegate() = default;

assistant_client::HttpConnectionFactory*
MonyharApiDelegate::GetHttpConnectionFactory() {
  return &http_connection_factory_;
}

}  // namespace libassistant
}  // namespace chromeos
