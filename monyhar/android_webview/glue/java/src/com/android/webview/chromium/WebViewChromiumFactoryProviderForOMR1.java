// Copyright 2017 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package com.android.webview.monyhar;

class WebViewMonyharFactoryProviderForOMR1 extends WebViewMonyharFactoryProvider {
    public static WebViewMonyharFactoryProvider create(android.webkit.WebViewDelegate delegate) {
        return new WebViewMonyharFactoryProviderForOMR1(delegate);
    }

    protected WebViewMonyharFactoryProviderForOMR1(android.webkit.WebViewDelegate delegate) {
        super(delegate);
    }
}
