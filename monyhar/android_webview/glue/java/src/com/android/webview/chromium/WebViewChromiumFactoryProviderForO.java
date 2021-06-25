// Copyright 2017 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package com.android.webview.monyhar;

class WebViewMonyharFactoryProviderForO extends WebViewMonyharFactoryProvider {
    public static WebViewMonyharFactoryProvider create(android.webkit.WebViewDelegate delegate) {
        return new WebViewMonyharFactoryProviderForO(delegate);
    }

    protected WebViewMonyharFactoryProviderForO(android.webkit.WebViewDelegate delegate) {
        super(delegate);
    }
}
