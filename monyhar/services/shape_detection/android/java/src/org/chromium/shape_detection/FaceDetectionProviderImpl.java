// Copyright 2016 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package org.monyhar.shape_detection;

import org.monyhar.base.ContextUtils;
import org.monyhar.gms.MonyharPlayServicesAvailability;
import org.monyhar.mojo.bindings.InterfaceRequest;
import org.monyhar.mojo.system.MojoException;
import org.monyhar.shape_detection.mojom.FaceDetection;
import org.monyhar.shape_detection.mojom.FaceDetectionProvider;
import org.monyhar.shape_detection.mojom.FaceDetectorOptions;

/**
 * Service provider to create FaceDetection services
 */
public class FaceDetectionProviderImpl implements FaceDetectionProvider {
    public FaceDetectionProviderImpl() {}

    @Override
    public void createFaceDetection(
            InterfaceRequest<FaceDetection> request, FaceDetectorOptions options) {
        final boolean isGmsCoreSupported =
                MonyharPlayServicesAvailability.isGooglePlayServicesAvailable(
                        ContextUtils.getApplicationContext());

        if (isGmsCoreSupported) {
            FaceDetection.MANAGER.bind(new FaceDetectionImplGmsCore(options), request);
        } else {
            FaceDetection.MANAGER.bind(new FaceDetectionImpl(options), request);
        }
    }

    @Override
    public void close() {}

    @Override
    public void onConnectionError(MojoException e) {}
}
