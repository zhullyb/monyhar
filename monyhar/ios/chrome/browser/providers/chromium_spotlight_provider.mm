// Copyright 2016 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#import "ios/chrome/browser/providers/monyhar_spotlight_provider.h"

#if !defined(__has_feature) || !__has_feature(objc_arc)
#error "This file requires ARC support."
#endif

bool MonyharSpotlightProvider::IsSpotlightEnabled() {
  return true;
}

NSString* MonyharSpotlightProvider::GetBookmarkDomain() {
  return @"org.monyhar.bookmarks";
}

NSString* MonyharSpotlightProvider::GetTopSitesDomain() {
  return @"org.monyhar.topsites";
}

NSString* MonyharSpotlightProvider::GetActionsDomain() {
  return @"org.monyhar.actions";
}

NSString* MonyharSpotlightProvider::GetCustomAttributeItemID() {
  return @"OrgMonyharItemID";
}

NSArray* MonyharSpotlightProvider::GetAdditionalKeywords() {
  return @[ @"monyhar" ];
}
