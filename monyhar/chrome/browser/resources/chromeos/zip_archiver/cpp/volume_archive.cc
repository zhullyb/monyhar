// Copyright 2018 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "chrome/browser/resources/chromeos/zip_archiver/cpp/volume_archive.h"

VolumeArchive::VolumeArchive(std::unique_ptr<VolumeReader> reader)
    : reader_(std::move(reader)) {}

VolumeArchive::~VolumeArchive() = default;
