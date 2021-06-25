// Copyright 2017 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.tabs.onCreated.addListener(() => { chrome.test.notifyPass() });
