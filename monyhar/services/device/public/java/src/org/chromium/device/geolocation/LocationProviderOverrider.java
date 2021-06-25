// Copyright 2018 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package org.monyhar.device.geolocation;

/**
 * Set the MockLocationProvider to LocationProviderFactory. Used for test only.
 */
final public class LocationProviderOverrider {
    public static void setLocationProviderImpl(LocationProvider provider) {
        LocationProviderFactory.setLocationProviderImpl(provider);
    }

    private LocationProviderOverrider() {}
};
