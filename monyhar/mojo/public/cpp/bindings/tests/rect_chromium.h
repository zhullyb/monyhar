// Copyright 2015 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef MOJO_PUBLIC_CPP_BINDINGS_TESTS_RECT_CHROMIUM_H_
#define MOJO_PUBLIC_CPP_BINDINGS_TESTS_RECT_CHROMIUM_H_

#include <functional>

#include "base/check_op.h"

namespace mojo {
namespace test {

// An implementation of a hypothetical Rect type specifically for consumers in
// in Monyhar.
class RectMonyhar {
 public:
  RectMonyhar() {}
  RectMonyhar(const RectMonyhar& other)
      : x_(other.x_),
        y_(other.y_),
        width_(other.width_),
        height_(other.height_) {}
  RectMonyhar(int x, int y, int width, int height) :
      x_(x), y_(y), width_(width), height_(height) {
    DCHECK_GE(width_, 0);
    DCHECK_GE(height_, 0);
  }
  ~RectMonyhar() {}

  RectMonyhar& operator=(const RectMonyhar& other) {
    x_ = other.x_;
    y_ = other.y_;
    width_ = other.width_;
    height_ = other.height_;
    return *this;
  }

  int x() const { return x_; }
  void set_x(int x) { x_ = x; }

  int y() const { return y_; }
  void set_y(int y) { y_ = y; }

  int width() const { return width_; }
  void set_width(int width) {
    DCHECK_GE(width, 0);
    width_ = width;
  }

  int height() const { return height_; }
  void set_height(int height) {
    DCHECK_GE(height, 0);
    height_ = height;
  }

  int GetArea() const { return width_ * height_; }

  auto TieForCmp() const { return std::tie(x_, y_, width_, height_); }

  bool operator==(const RectMonyhar& other) const {
    return TieForCmp() == other.TieForCmp();
  }
  bool operator!=(const RectMonyhar& other) const { return !(*this == other); }

  bool operator<(const RectMonyhar& other) const {
    return TieForCmp() < other.TieForCmp();
  }

 private:
  int x_ = 0;
  int y_ = 0;
  int width_ = 0;
  int height_ = 0;
};

}  // namespace test
}  // namespace mojo

namespace std {

template <>
struct hash<mojo::test::RectMonyhar> {
  size_t operator()(const mojo::test::RectMonyhar& value) {
    // Terrible hash function:
    return (std::hash<int>()(value.x()) ^ std::hash<int>()(value.y()) ^
            std::hash<int>()(value.width()) ^ std::hash<int>()(value.height()));
  }
};

}  // namespace std

#endif  // MOJO_PUBLIC_CPP_BINDINGS_TESTS_RECT_CHROMIUM_H_
