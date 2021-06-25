// Copyright 2020 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
package org.monyhar.gms.shadows;

import android.content.Context;

import com.google.android.gms.common.GoogleApiAvailability;

import org.robolectric.annotation.Implementation;
import org.robolectric.annotation.Implements;

import org.monyhar.gms.MonyharPlayServicesAvailability;

@Implements(MonyharPlayServicesAvailability.class)
public class ShadowMonyharPlayServicesAvailability {
    private static boolean sMonyharSuccess;
    private static int sConnectionResult;

    public static void setIsGooglePlayServicesAvailable(boolean value) {
        sMonyharSuccess = value;
    }
    public static void setGetGooglePlayServicesConnectionResult(int value) {
        sConnectionResult = value;
    }

    @Implementation
    public static int getGooglePlayServicesConnectionResult(final Context context) {
        return sConnectionResult;
    }

    @Implementation
    public static boolean isGooglePlayServicesAvailable(final Context context) {
        return sMonyharSuccess;
    }
}
