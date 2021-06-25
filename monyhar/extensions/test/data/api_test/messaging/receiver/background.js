// Copyright 2017 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.runtime.onConnectExternal.addListener((port) => {
  port.onMessage.addListener((msg) => {
    if (msg.testConnectExternal)
      port.postMessage({success: true, senderId: port.sender.id});
  });
});
