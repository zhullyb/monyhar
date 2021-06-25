// Copyright 2017 The Monyhar Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package org.monyhar.android_webview;

import org.monyhar.base.ThreadUtils;
import org.monyhar.base.task.PostTask;
import org.monyhar.content_public.browser.UiThreadTaskTraits;

import java.util.Queue;
import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.FutureTask;
import java.util.concurrent.TimeUnit;

/**
 * Queue used for running tasks, initiated through WebView APIs, on the UI thread.
 * The queue won't start running tasks until WebView has been initialized properly.
 */
public class WebViewMonyharRunQueue {
    private final Queue<Runnable> mQueue;
    private final MonyharHasStartedCallable mMonyharHasStartedCallable;

    /**
     * Callable representing whether WebView has been initialized, and we should start running
     * tasks.
     */
    public static interface MonyharHasStartedCallable { public boolean hasStarted(); }

    public WebViewMonyharRunQueue(MonyharHasStartedCallable monyharHasStartedCallable) {
        mQueue = new ConcurrentLinkedQueue<Runnable>();
        mMonyharHasStartedCallable = monyharHasStartedCallable;
    }

    /**
     * Add a new task to the queue. If WebView has already been initialized the task will be run
     * ASAP.
     */
    public void addTask(Runnable task) {
        mQueue.add(task);
        if (mMonyharHasStartedCallable.hasStarted()) {
            PostTask.runOrPostTask(UiThreadTaskTraits.DEFAULT, () -> { drainQueue(); });
        }
    }

    /**
     * Drain the queue, i.e. perform all the tasks in the queue.
     */
    public void drainQueue() {
        if (mQueue == null || mQueue.isEmpty()) {
            return;
        }

        Runnable task = mQueue.poll();
        while (task != null) {
            task.run();
            task = mQueue.poll();
        }
    }

    public boolean monyharHasStarted() {
        return mMonyharHasStartedCallable.hasStarted();
    }

    public <T> T runBlockingFuture(FutureTask<T> task) {
        if (!monyharHasStarted()) throw new RuntimeException("Must be started before we block!");
        if (ThreadUtils.runningOnUiThread()) {
            throw new IllegalStateException("This method should only be called off the UI thread");
        }
        addTask(task);
        try {
            return task.get(4, TimeUnit.SECONDS);
        } catch (java.util.concurrent.TimeoutException e) {
            throw new RuntimeException("Probable deadlock detected due to WebView API being called "
                            + "on incorrect thread while the UI thread is blocked.",
                    e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // We have a 4 second timeout to try to detect deadlocks to detect and aid in debugging
    // deadlocks.
    // Do not call this method while on the UI thread!
    public void runVoidTaskOnUiThreadBlocking(Runnable r) {
        FutureTask<Void> task = new FutureTask<Void>(r, null);
        runBlockingFuture(task);
    }

    public <T> T runOnUiThreadBlocking(Callable<T> c) {
        return runBlockingFuture(new FutureTask<T>(c));
    }
}
