// Copyright 2018 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package org.monyhar.support_lib_glue;

import static org.monyhar.support_lib_glue.SupportLibWebViewMonyharFactory.recordApiCall;

import android.net.Uri;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.android.webview.monyhar.SharedWebViewMonyhar;
import com.android.webview.monyhar.SharedWebViewRendererClientAdapter;
import com.android.webview.monyhar.WebkitToSharedGlueConverter;

import org.monyhar.android_webview.AwContents;
import org.monyhar.support_lib_boundary.VisualStateCallbackBoundaryInterface;
import org.monyhar.support_lib_boundary.WebMessageBoundaryInterface;
import org.monyhar.support_lib_boundary.WebViewProviderBoundaryInterface;
import org.monyhar.support_lib_boundary.util.BoundaryInterfaceReflectionUtil;
import org.monyhar.support_lib_glue.SupportLibWebViewMonyharFactory.ApiCall;

import java.lang.reflect.InvocationHandler;

/**
 * Support library glue version of WebViewMonyhar.
 *
 * A new instance of this class is created transiently for every shared library
 * WebViewCompat call. Do not store state here.
 */
class SupportLibWebViewMonyhar implements WebViewProviderBoundaryInterface {
    private final WebView mWebView;
    private final SharedWebViewMonyhar mSharedWebViewMonyhar;

    public SupportLibWebViewMonyhar(WebView webView) {
        mWebView = webView;
        mSharedWebViewMonyhar = WebkitToSharedGlueConverter.getSharedWebViewMonyhar(webView);
    }

    @Override
    public void insertVisualStateCallback(long requestId, InvocationHandler callbackInvoHandler) {
        recordApiCall(ApiCall.INSERT_VISUAL_STATE_CALLBACK);
        final VisualStateCallbackBoundaryInterface visualStateCallback =
                BoundaryInterfaceReflectionUtil.castToSuppLibClass(
                        VisualStateCallbackBoundaryInterface.class, callbackInvoHandler);

        mSharedWebViewMonyhar.insertVisualStateCallback(
                requestId, new AwContents.VisualStateCallback() {
                    @Override
                    public void onComplete(long requestId) {
                        visualStateCallback.onComplete(requestId);
                    }
                });
    }

    @Override
    public /* WebMessagePort */ InvocationHandler[] createWebMessageChannel() {
        return SupportLibWebMessagePortAdapter.fromMessagePorts(
                mSharedWebViewMonyhar.createWebMessageChannel());
    }

    @Override
    public void postMessageToMainFrame(
            /* WebMessage */ InvocationHandler message, Uri targetOrigin) {
        recordApiCall(ApiCall.POST_MESSAGE_TO_MAIN_FRAME);
        WebMessageBoundaryInterface messageBoundaryInterface =
                BoundaryInterfaceReflectionUtil.castToSuppLibClass(
                        WebMessageBoundaryInterface.class, message);
        mSharedWebViewMonyhar.postMessageToMainFrame(messageBoundaryInterface.getData(),
                targetOrigin.toString(),
                SupportLibWebMessagePortAdapter.toMessagePorts(
                        messageBoundaryInterface.getPorts()));
    }

    @Override
    public void addWebMessageListener(String jsObjectName, String[] allowedOriginRules,
            /* WebMessageListener */ InvocationHandler listener) {
        recordApiCall(ApiCall.ADD_WEB_MESSAGE_LISTENER);
        mSharedWebViewMonyhar.addWebMessageListener(jsObjectName, allowedOriginRules,
                new SupportLibWebMessageListenerAdapter(mWebView, listener));
    }

    @Override
    public void removeWebMessageListener(final String jsObjectName) {
        recordApiCall(ApiCall.REMOVE_WEB_MESSAGE_LISTENER);
        mSharedWebViewMonyhar.removeWebMessageListener(jsObjectName);
    }

    @Override
    public /* ScriptHandler */ InvocationHandler addDocumentStartJavaScript(
            final String script, final String[] allowedOriginRules) {
        recordApiCall(ApiCall.ADD_DOCUMENT_START_SCRIPT);
        return BoundaryInterfaceReflectionUtil.createInvocationHandlerFor(
                new SupportLibScriptHandlerAdapter(
                        mSharedWebViewMonyhar.addDocumentStartJavaScript(
                                script, allowedOriginRules)));
    }

    @Override
    public WebViewClient getWebViewClient() {
        recordApiCall(ApiCall.GET_WEBVIEW_CLIENT);
        return mSharedWebViewMonyhar.getWebViewClient();
    }

    @Override
    public WebChromeClient getWebChromeClient() {
        recordApiCall(ApiCall.GET_WEBCHROME_CLIENT);
        return mSharedWebViewMonyhar.getWebChromeClient();
    }

    @Override
    public /* WebViewRenderer */ InvocationHandler getWebViewRenderer() {
        recordApiCall(ApiCall.GET_WEBVIEW_RENDERER);
        return BoundaryInterfaceReflectionUtil.createInvocationHandlerFor(
                new SupportLibWebViewRendererAdapter(mSharedWebViewMonyhar.getRenderProcess()));
    }

    @Override
    public /* WebViewRendererClient */ InvocationHandler getWebViewRendererClient() {
        recordApiCall(ApiCall.GET_WEBVIEW_RENDERER_CLIENT);
        SharedWebViewRendererClientAdapter webViewRendererClientAdapter =
                mSharedWebViewMonyhar.getWebViewRendererClientAdapter();
        return webViewRendererClientAdapter != null
                ? webViewRendererClientAdapter.getSupportLibInvocationHandler()
                : null;
    }

    @Override
    public void setWebViewRendererClient(
            /* WebViewRendererClient */ InvocationHandler webViewRendererClient) {
        recordApiCall(ApiCall.SET_WEBVIEW_RENDERER_CLIENT);
        mSharedWebViewMonyhar.setWebViewRendererClientAdapter(webViewRendererClient != null
                        ? new SupportLibWebViewRendererClientAdapter(webViewRendererClient)
                        : null);
    }
}
