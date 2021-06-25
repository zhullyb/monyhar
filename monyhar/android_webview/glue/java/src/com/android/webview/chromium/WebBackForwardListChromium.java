// Copyright 2014 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package com.android.webview.monyhar;

import android.webkit.WebBackForwardList;
import android.webkit.WebHistoryItem;

import org.monyhar.content_public.browser.NavigationHistory;

import java.util.ArrayList;
import java.util.List;

/**
 * WebView Monyhar implementation of WebBackForwardList. Simple immutable
 * wrapper around NavigationHistory.
 */
@SuppressWarnings("NoSynchronizedMethodCheck")
public class WebBackForwardListMonyhar extends WebBackForwardList {
    private final List<WebHistoryItemMonyhar> mHistroryItemList;
    private final int mCurrentIndex;

    /* package */ WebBackForwardListMonyhar(NavigationHistory navHistory) {
        mCurrentIndex = navHistory.getCurrentEntryIndex();
        mHistroryItemList = new ArrayList<WebHistoryItemMonyhar>(navHistory.getEntryCount());
        for (int i = 0; i < navHistory.getEntryCount(); ++i) {
            mHistroryItemList.add(new WebHistoryItemMonyhar(navHistory.getEntryAtIndex(i)));
        }
    }

    /**
     * See {@link android.webkit.WebBackForwardList#getCurrentItem}.
     */
    @Override
    public synchronized WebHistoryItem getCurrentItem() {
        if (getSize() == 0) {
            return null;
        } else {
            return getItemAtIndex(getCurrentIndex());
        }
    }

    /**
     * See {@link android.webkit.WebBackForwardList#getCurrentIndex}.
     */
    @Override
    public synchronized int getCurrentIndex() {
        return mCurrentIndex;
    }

    /**
     * See {@link android.webkit.WebBackForwardList#getItemAtIndex}.
     */
    @Override
    public synchronized WebHistoryItem getItemAtIndex(int index) {
        if (index < 0 || index >= getSize()) {
            return null;
        } else {
            return mHistroryItemList.get(index);
        }
    }

    /**
     * See {@link android.webkit.WebBackForwardList#getSize}.
     */
    @Override
    public synchronized int getSize() {
        return mHistroryItemList.size();
    }

    // Clone constructor.
    private WebBackForwardListMonyhar(List<WebHistoryItemMonyhar> list, int currentIndex) {
        mHistroryItemList = list;
        mCurrentIndex = currentIndex;
    }

    /**
     * See {@link android.webkit.WebBackForwardList#clone}.
     */
    @Override
    protected synchronized WebBackForwardListMonyhar clone() {
        List<WebHistoryItemMonyhar> list = new ArrayList<WebHistoryItemMonyhar>(getSize());
        for (int i = 0; i < getSize(); ++i) {
            list.add(mHistroryItemList.get(i).clone());
        }
        return new WebBackForwardListMonyhar(list, mCurrentIndex);
    }
}
