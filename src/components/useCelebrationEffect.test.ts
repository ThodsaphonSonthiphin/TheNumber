import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCelebrationEffect } from './useCelebrationEffect';

describe('useCelebrationEffect', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should start with isVisible false', () => {
    const { result } = renderHook(() => useCelebrationEffect());
    expect(result.current.isVisible).toBe(false);
  });

  it('should set isVisible to true when triggered', () => {
    const { result } = renderHook(() => useCelebrationEffect());

    act(() => {
      result.current.trigger();
    });

    expect(result.current.isVisible).toBe(true);
  });

  it('should auto-dismiss after duration', () => {
    const { result } = renderHook(() => useCelebrationEffect(1000));

    act(() => {
      result.current.trigger();
    });

    expect(result.current.isVisible).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.isVisible).toBe(false);
  });

  it('should use default duration of 1500ms', () => {
    const { result } = renderHook(() => useCelebrationEffect());

    act(() => {
      result.current.trigger();
    });

    act(() => {
      vi.advanceTimersByTime(1499);
    });
    expect(result.current.isVisible).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.isVisible).toBe(false);
  });

  it('should reset timer when triggered again', () => {
    const { result } = renderHook(() => useCelebrationEffect(1000));

    act(() => {
      result.current.trigger();
    });

    act(() => {
      vi.advanceTimersByTime(800);
    });
    expect(result.current.isVisible).toBe(true);

    // Trigger again - should reset the timer
    act(() => {
      result.current.trigger();
    });

    act(() => {
      vi.advanceTimersByTime(800);
    });
    // Should still be visible because timer was reset
    expect(result.current.isVisible).toBe(true);

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current.isVisible).toBe(false);
  });
});
