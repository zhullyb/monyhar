// Copyright 2019 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package com.android.webview.monyhar;

public class WebViewMonyharFactoryProviderForQ extends WebViewMonyharFactoryProvider {
    public static WebViewMonyharFactoryProvider create(android.webkit.WebViewDelegate delegate) {
        return new WebViewMonyharFactoryProviderForQ(delegate);
    }

    protected WebViewMonyharFactoryProviderForQ(android.webkit.WebViewDelegate delegate) {
        super(delegate);
    }
}
