// Copyright 2016 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// eslint-disable-next-line no-var
var volumeManagerFactory = {};

/**
 * @return {!Promise<!VolumeManager>}
 */
volumeManagerFactory.getInstance = function() {};

/**
 * @return {VolumeManager}
 */
volumeManagerFactory.getInstanceForDebug = function() {};

volumeManagerFactory.revokeInstanceForTesting = function() {};
