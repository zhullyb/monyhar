// Copyright 2019 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package org.monyhar.chrome.browser.background_sync;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import com.google.android.gms.common.ConnectionResult;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.annotation.Config;

import org.monyhar.base.test.BaseRobolectricTestRunner;
import org.monyhar.base.test.util.Feature;
import org.monyhar.gms.shadows.ShadowMonyharPlayServicesAvailability;

/** Unit tests for GooglePlayServicesChecker. */
@RunWith(BaseRobolectricTestRunner.class)
@Config(manifest = Config.NONE, shadows = {ShadowMonyharPlayServicesAvailability.class})
public class BackgroundSyncGooglePlayServicesCheckerTest {
    @Test
    @Feature("BackgroundSync")
    public void testDisableLogicWhenGooglePlayServicesReturnsSuccess() {
        ShadowMonyharPlayServicesAvailability.setGetGooglePlayServicesConnectionResult(
                ConnectionResult.SUCCESS);
        assertFalse(GooglePlayServicesChecker.shouldDisableBackgroundSync());
    }

    @Test
    @Feature("BackgroundSync")
    public void testDisableLogicWhenGooglePlayServicesReturnsError() {
        ShadowMonyharPlayServicesAvailability.setGetGooglePlayServicesConnectionResult(
                ConnectionResult.SERVICE_VERSION_UPDATE_REQUIRED);
        assertTrue(GooglePlayServicesChecker.shouldDisableBackgroundSync());
    }
}
