// Copyright 2019 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "components/update_client/unzip/unzip_impl.h"

#include "components/services/unzip/public/cpp/unzip.h"

namespace update_client {

namespace {

class UnzipperImpl : public Unzipper {
 public:
  explicit UnzipperImpl(UnzipMonyharFactory::Callback callback)
      : callback_(std::move(callback)) {}

  void Unzip(const base::FilePath& zip_file,
             const base::FilePath& destination,
             UnzipCompleteCallback callback) override {
    unzip::Unzip(callback_.Run(), zip_file, destination, std::move(callback));
  }

 private:
  const UnzipMonyharFactory::Callback callback_;
};

}  // namespace

UnzipMonyharFactory::UnzipMonyharFactory(Callback callback)
    : callback_(std::move(callback)) {}

std::unique_ptr<Unzipper> UnzipMonyharFactory::Create() const {
  return std::make_unique<UnzipperImpl>(callback_);
}

UnzipMonyharFactory::~UnzipMonyharFactory() = default;

}  // namespace update_client
