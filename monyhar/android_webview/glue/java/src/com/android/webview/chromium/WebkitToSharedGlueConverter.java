// Copyright 2018 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package com.android.webview.monyhar;

import android.webkit.SafeBrowsingResponse;
import android.webkit.ServiceWorkerWebSettings;
import android.webkit.WebMessagePort;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;

import org.monyhar.android_webview.AwContentsClient.AwWebResourceError;
import org.monyhar.android_webview.AwContentsClient.AwWebResourceRequest;
import org.monyhar.android_webview.AwServiceWorkerSettings;
import org.monyhar.android_webview.AwSettings;
import org.monyhar.android_webview.safe_browsing.AwSafeBrowsingResponse;
import org.monyhar.base.Callback;
import org.monyhar.content_public.browser.MessagePort;

/**
 * Class converting webkit objects to glue-objects shared between the webkit-glue and the support
 * library glue.
 * This class is used to minimize dependencies from the support-library-glue on the webkit-glue.
 */
public class WebkitToSharedGlueConverter {
    public static SharedWebViewMonyhar getSharedWebViewMonyhar(WebView webview) {
        WebViewMonyhar webviewMonyhar = (WebViewMonyhar) webview.getWebViewProvider();
        return webviewMonyhar.getSharedWebViewMonyhar();
    }

    public static AwSettings getSettings(WebSettings webSettings) {
        ContentSettingsAdapter contentSettingsAdapter = (ContentSettingsAdapter) webSettings;
        return contentSettingsAdapter.getAwSettings();
    }

    public static WebViewMonyharAwInit getGlobalAwInit() {
        return WebViewMonyharFactoryProvider.getSingleton().getAwInit();
    }

    public static AwServiceWorkerSettings getServiceWorkerSettings(
            ServiceWorkerWebSettings settings) {
        ServiceWorkerSettingsAdapter adapter = (ServiceWorkerSettingsAdapter) settings;
        return adapter.getAwSettings();
    }

    public static AwWebResourceRequest getWebResourceRequest(WebResourceRequest request) {
        WebResourceRequestAdapter adapter = (WebResourceRequestAdapter) request;
        return adapter.getAwResourceRequest();
    }

    public static AwWebResourceError getAwWebResourceError(WebResourceError error) {
        return ((WebResourceErrorAdapter) error).getAwWebResourceError();
    }

    public static Callback<AwSafeBrowsingResponse> getAwSafeBrowsingResponseCallback(
            SafeBrowsingResponse response) {
        return ((SafeBrowsingResponseAdapter) response).getAwSafeBrowsingResponseCallback();
    }

    public static MessagePort getMessagePort(WebMessagePort messagePort) {
        return ((WebMessagePortAdapter) messagePort).getPort();
    }
}
