// Copyright 2021 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.accessibilityPrivate.showConfirmationDialog(
    'Confirm me! 🐶', 'This dialog should be confirmed.', (confirmed) => {
      if (confirmed) {
        chrome.test.succeed();
      } else {
        chrome.test.fail();
      }
    });

chrome.test.notifyPass();
