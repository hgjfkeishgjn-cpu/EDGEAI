import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { Alert, AlertInput, GetMarketPricesParams, GetRecentActivityParams, HealthStatus, ListSignalsParams, PortfolioStats, Position, PositionInput, PositionUpdate, PriceData, Signal, SignalRequest, SignalSummary, Subscription, SubscriptionInput, TrendingAsset, WatchlistInput, WatchlistItem } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * Returns server health status
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListSignalsUrl: (params?: ListSignalsParams) => string;
/**
 * @summary List AI trading signals
 */
export declare const listSignals: (params?: ListSignalsParams, options?: RequestInit) => Promise<Signal[]>;
export declare const getListSignalsQueryKey: (params?: ListSignalsParams) => readonly ["/api/signals", ...ListSignalsParams[]];
export declare const getListSignalsQueryOptions: <TData = Awaited<ReturnType<typeof listSignals>>, TError = ErrorType<unknown>>(params?: ListSignalsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listSignals>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listSignals>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListSignalsQueryResult = NonNullable<Awaited<ReturnType<typeof listSignals>>>;
export type ListSignalsQueryError = ErrorType<unknown>;
/**
 * @summary List AI trading signals
 */
export declare function useListSignals<TData = Awaited<ReturnType<typeof listSignals>>, TError = ErrorType<unknown>>(params?: ListSignalsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listSignals>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGenerateSignalUrl: () => string;
/**
 * @summary Generate AI signal for a symbol
 */
export declare const generateSignal: (signalRequest: SignalRequest, options?: RequestInit) => Promise<Signal>;
export declare const getGenerateSignalMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof generateSignal>>, TError, {
        data: BodyType<SignalRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof generateSignal>>, TError, {
    data: BodyType<SignalRequest>;
}, TContext>;
export type GenerateSignalMutationResult = NonNullable<Awaited<ReturnType<typeof generateSignal>>>;
export type GenerateSignalMutationBody = BodyType<SignalRequest>;
export type GenerateSignalMutationError = ErrorType<unknown>;
/**
* @summary Generate AI signal for a symbol
*/
export declare const useGenerateSignal: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof generateSignal>>, TError, {
        data: BodyType<SignalRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof generateSignal>>, TError, {
    data: BodyType<SignalRequest>;
}, TContext>;
export declare const getGetSignalUrl: (id: number) => string;
/**
 * @summary Get a specific signal
 */
export declare const getSignal: (id: number, options?: RequestInit) => Promise<Signal>;
export declare const getGetSignalQueryKey: (id: number) => readonly [`/api/signals/${number}`];
export declare const getGetSignalQueryOptions: <TData = Awaited<ReturnType<typeof getSignal>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSignal>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSignal>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSignalQueryResult = NonNullable<Awaited<ReturnType<typeof getSignal>>>;
export type GetSignalQueryError = ErrorType<void>;
/**
 * @summary Get a specific signal
 */
export declare function useGetSignal<TData = Awaited<ReturnType<typeof getSignal>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSignal>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetSignalSummaryUrl: () => string;
/**
 * @summary Dashboard summary stats
 */
export declare const getSignalSummary: (options?: RequestInit) => Promise<SignalSummary>;
export declare const getGetSignalSummaryQueryKey: () => readonly ["/api/signals/dashboard/summary"];
export declare const getGetSignalSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getSignalSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSignalSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSignalSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSignalSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getSignalSummary>>>;
export type GetSignalSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Dashboard summary stats
 */
export declare function useGetSignalSummary<TData = Awaited<ReturnType<typeof getSignalSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSignalSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetRecentActivityUrl: (params?: GetRecentActivityParams) => string;
/**
 * @summary Recent signal activity feed
 */
export declare const getRecentActivity: (params?: GetRecentActivityParams, options?: RequestInit) => Promise<Signal[]>;
export declare const getGetRecentActivityQueryKey: (params?: GetRecentActivityParams) => readonly ["/api/signals/recent/activity", ...GetRecentActivityParams[]];
export declare const getGetRecentActivityQueryOptions: <TData = Awaited<ReturnType<typeof getRecentActivity>>, TError = ErrorType<unknown>>(params?: GetRecentActivityParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRecentActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getRecentActivity>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetRecentActivityQueryResult = NonNullable<Awaited<ReturnType<typeof getRecentActivity>>>;
export type GetRecentActivityQueryError = ErrorType<unknown>;
/**
 * @summary Recent signal activity feed
 */
export declare function useGetRecentActivity<TData = Awaited<ReturnType<typeof getRecentActivity>>, TError = ErrorType<unknown>>(params?: GetRecentActivityParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRecentActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetTopPerformersUrl: () => string;
/**
 * @summary Top performing signals by confidence
 */
export declare const getTopPerformers: (options?: RequestInit) => Promise<Signal[]>;
export declare const getGetTopPerformersQueryKey: () => readonly ["/api/signals/top/performers"];
export declare const getGetTopPerformersQueryOptions: <TData = Awaited<ReturnType<typeof getTopPerformers>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTopPerformers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getTopPerformers>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetTopPerformersQueryResult = NonNullable<Awaited<ReturnType<typeof getTopPerformers>>>;
export type GetTopPerformersQueryError = ErrorType<unknown>;
/**
 * @summary Top performing signals by confidence
 */
export declare function useGetTopPerformers<TData = Awaited<ReturnType<typeof getTopPerformers>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTopPerformers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListWatchlistUrl: () => string;
/**
 * @summary Get user watchlist
 */
export declare const listWatchlist: (options?: RequestInit) => Promise<WatchlistItem[]>;
export declare const getListWatchlistQueryKey: () => readonly ["/api/watchlist"];
export declare const getListWatchlistQueryOptions: <TData = Awaited<ReturnType<typeof listWatchlist>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listWatchlist>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listWatchlist>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListWatchlistQueryResult = NonNullable<Awaited<ReturnType<typeof listWatchlist>>>;
export type ListWatchlistQueryError = ErrorType<unknown>;
/**
 * @summary Get user watchlist
 */
export declare function useListWatchlist<TData = Awaited<ReturnType<typeof listWatchlist>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listWatchlist>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getAddToWatchlistUrl: () => string;
/**
 * @summary Add symbol to watchlist
 */
export declare const addToWatchlist: (watchlistInput: WatchlistInput, options?: RequestInit) => Promise<WatchlistItem>;
export declare const getAddToWatchlistMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addToWatchlist>>, TError, {
        data: BodyType<WatchlistInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof addToWatchlist>>, TError, {
    data: BodyType<WatchlistInput>;
}, TContext>;
export type AddToWatchlistMutationResult = NonNullable<Awaited<ReturnType<typeof addToWatchlist>>>;
export type AddToWatchlistMutationBody = BodyType<WatchlistInput>;
export type AddToWatchlistMutationError = ErrorType<unknown>;
/**
* @summary Add symbol to watchlist
*/
export declare const useAddToWatchlist: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addToWatchlist>>, TError, {
        data: BodyType<WatchlistInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof addToWatchlist>>, TError, {
    data: BodyType<WatchlistInput>;
}, TContext>;
export declare const getRemoveFromWatchlistUrl: (id: number) => string;
/**
 * @summary Remove symbol from watchlist
 */
export declare const removeFromWatchlist: (id: number, options?: RequestInit) => Promise<void>;
export declare const getRemoveFromWatchlistMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeFromWatchlist>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof removeFromWatchlist>>, TError, {
    id: number;
}, TContext>;
export type RemoveFromWatchlistMutationResult = NonNullable<Awaited<ReturnType<typeof removeFromWatchlist>>>;
export type RemoveFromWatchlistMutationError = ErrorType<unknown>;
/**
* @summary Remove symbol from watchlist
*/
export declare const useRemoveFromWatchlist: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeFromWatchlist>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof removeFromWatchlist>>, TError, {
    id: number;
}, TContext>;
export declare const getListPortfolioUrl: () => string;
/**
 * @summary Get portfolio positions
 */
export declare const listPortfolio: (options?: RequestInit) => Promise<Position[]>;
export declare const getListPortfolioQueryKey: () => readonly ["/api/portfolio"];
export declare const getListPortfolioQueryOptions: <TData = Awaited<ReturnType<typeof listPortfolio>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listPortfolio>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listPortfolio>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListPortfolioQueryResult = NonNullable<Awaited<ReturnType<typeof listPortfolio>>>;
export type ListPortfolioQueryError = ErrorType<unknown>;
/**
 * @summary Get portfolio positions
 */
export declare function useListPortfolio<TData = Awaited<ReturnType<typeof listPortfolio>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listPortfolio>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getAddPositionUrl: () => string;
/**
 * @summary Add or update a portfolio position
 */
export declare const addPosition: (positionInput: PositionInput, options?: RequestInit) => Promise<Position>;
export declare const getAddPositionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addPosition>>, TError, {
        data: BodyType<PositionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof addPosition>>, TError, {
    data: BodyType<PositionInput>;
}, TContext>;
export type AddPositionMutationResult = NonNullable<Awaited<ReturnType<typeof addPosition>>>;
export type AddPositionMutationBody = BodyType<PositionInput>;
export type AddPositionMutationError = ErrorType<unknown>;
/**
* @summary Add or update a portfolio position
*/
export declare const useAddPosition: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addPosition>>, TError, {
        data: BodyType<PositionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof addPosition>>, TError, {
    data: BodyType<PositionInput>;
}, TContext>;
export declare const getUpdatePositionUrl: (id: number) => string;
/**
 * @summary Update a position
 */
export declare const updatePosition: (id: number, positionUpdate: PositionUpdate, options?: RequestInit) => Promise<Position>;
export declare const getUpdatePositionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updatePosition>>, TError, {
        id: number;
        data: BodyType<PositionUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updatePosition>>, TError, {
    id: number;
    data: BodyType<PositionUpdate>;
}, TContext>;
export type UpdatePositionMutationResult = NonNullable<Awaited<ReturnType<typeof updatePosition>>>;
export type UpdatePositionMutationBody = BodyType<PositionUpdate>;
export type UpdatePositionMutationError = ErrorType<unknown>;
/**
* @summary Update a position
*/
export declare const useUpdatePosition: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updatePosition>>, TError, {
        id: number;
        data: BodyType<PositionUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updatePosition>>, TError, {
    id: number;
    data: BodyType<PositionUpdate>;
}, TContext>;
export declare const getDeletePositionUrl: (id: number) => string;
/**
 * @summary Remove a position
 */
export declare const deletePosition: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeletePositionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deletePosition>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deletePosition>>, TError, {
    id: number;
}, TContext>;
export type DeletePositionMutationResult = NonNullable<Awaited<ReturnType<typeof deletePosition>>>;
export type DeletePositionMutationError = ErrorType<unknown>;
/**
* @summary Remove a position
*/
export declare const useDeletePosition: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deletePosition>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deletePosition>>, TError, {
    id: number;
}, TContext>;
export declare const getGetPortfolioStatsUrl: () => string;
/**
 * @summary Portfolio performance stats
 */
export declare const getPortfolioStats: (options?: RequestInit) => Promise<PortfolioStats>;
export declare const getGetPortfolioStatsQueryKey: () => readonly ["/api/portfolio/stats/summary"];
export declare const getGetPortfolioStatsQueryOptions: <TData = Awaited<ReturnType<typeof getPortfolioStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPortfolioStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getPortfolioStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetPortfolioStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getPortfolioStats>>>;
export type GetPortfolioStatsQueryError = ErrorType<unknown>;
/**
 * @summary Portfolio performance stats
 */
export declare function useGetPortfolioStats<TData = Awaited<ReturnType<typeof getPortfolioStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPortfolioStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetMarketPricesUrl: (params: GetMarketPricesParams) => string;
/**
 * @summary Get current prices for symbols
 */
export declare const getMarketPrices: (params: GetMarketPricesParams, options?: RequestInit) => Promise<PriceData[]>;
export declare const getGetMarketPricesQueryKey: (params?: GetMarketPricesParams) => readonly ["/api/market/prices", ...GetMarketPricesParams[]];
export declare const getGetMarketPricesQueryOptions: <TData = Awaited<ReturnType<typeof getMarketPrices>>, TError = ErrorType<unknown>>(params: GetMarketPricesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMarketPrices>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMarketPrices>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMarketPricesQueryResult = NonNullable<Awaited<ReturnType<typeof getMarketPrices>>>;
export type GetMarketPricesQueryError = ErrorType<unknown>;
/**
 * @summary Get current prices for symbols
 */
export declare function useGetMarketPrices<TData = Awaited<ReturnType<typeof getMarketPrices>>, TError = ErrorType<unknown>>(params: GetMarketPricesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMarketPrices>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetTrendingAssetsUrl: () => string;
/**
 * @summary Get trending assets with momentum
 */
export declare const getTrendingAssets: (options?: RequestInit) => Promise<TrendingAsset[]>;
export declare const getGetTrendingAssetsQueryKey: () => readonly ["/api/market/trending"];
export declare const getGetTrendingAssetsQueryOptions: <TData = Awaited<ReturnType<typeof getTrendingAssets>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTrendingAssets>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getTrendingAssets>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetTrendingAssetsQueryResult = NonNullable<Awaited<ReturnType<typeof getTrendingAssets>>>;
export type GetTrendingAssetsQueryError = ErrorType<unknown>;
/**
 * @summary Get trending assets with momentum
 */
export declare function useGetTrendingAssets<TData = Awaited<ReturnType<typeof getTrendingAssets>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTrendingAssets>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListAlertsUrl: () => string;
/**
 * @summary List user alerts
 */
export declare const listAlerts: (options?: RequestInit) => Promise<Alert[]>;
export declare const getListAlertsQueryKey: () => readonly ["/api/alerts"];
export declare const getListAlertsQueryOptions: <TData = Awaited<ReturnType<typeof listAlerts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAlerts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAlerts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAlertsQueryResult = NonNullable<Awaited<ReturnType<typeof listAlerts>>>;
export type ListAlertsQueryError = ErrorType<unknown>;
/**
 * @summary List user alerts
 */
export declare function useListAlerts<TData = Awaited<ReturnType<typeof listAlerts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAlerts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateAlertUrl: () => string;
/**
 * @summary Create a price or signal alert
 */
export declare const createAlert: (alertInput: AlertInput, options?: RequestInit) => Promise<Alert>;
export declare const getCreateAlertMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAlert>>, TError, {
        data: BodyType<AlertInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createAlert>>, TError, {
    data: BodyType<AlertInput>;
}, TContext>;
export type CreateAlertMutationResult = NonNullable<Awaited<ReturnType<typeof createAlert>>>;
export type CreateAlertMutationBody = BodyType<AlertInput>;
export type CreateAlertMutationError = ErrorType<unknown>;
/**
* @summary Create a price or signal alert
*/
export declare const useCreateAlert: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAlert>>, TError, {
        data: BodyType<AlertInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createAlert>>, TError, {
    data: BodyType<AlertInput>;
}, TContext>;
export declare const getDeleteAlertUrl: (id: number) => string;
/**
 * @summary Delete an alert
 */
export declare const deleteAlert: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteAlertMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAlert>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteAlert>>, TError, {
    id: number;
}, TContext>;
export type DeleteAlertMutationResult = NonNullable<Awaited<ReturnType<typeof deleteAlert>>>;
export type DeleteAlertMutationError = ErrorType<unknown>;
/**
* @summary Delete an alert
*/
export declare const useDeleteAlert: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAlert>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteAlert>>, TError, {
    id: number;
}, TContext>;
export declare const getGetSubscriptionUrl: () => string;
/**
 * @summary Get current user subscription
 */
export declare const getSubscription: (options?: RequestInit) => Promise<Subscription>;
export declare const getGetSubscriptionQueryKey: () => readonly ["/api/subscription"];
export declare const getGetSubscriptionQueryOptions: <TData = Awaited<ReturnType<typeof getSubscription>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSubscription>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSubscription>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSubscriptionQueryResult = NonNullable<Awaited<ReturnType<typeof getSubscription>>>;
export type GetSubscriptionQueryError = ErrorType<unknown>;
/**
 * @summary Get current user subscription
 */
export declare function useGetSubscription<TData = Awaited<ReturnType<typeof getSubscription>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSubscription>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpsertSubscriptionUrl: () => string;
/**
 * @summary Create or upgrade subscription
 */
export declare const upsertSubscription: (subscriptionInput: SubscriptionInput, options?: RequestInit) => Promise<Subscription>;
export declare const getUpsertSubscriptionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof upsertSubscription>>, TError, {
        data: BodyType<SubscriptionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof upsertSubscription>>, TError, {
    data: BodyType<SubscriptionInput>;
}, TContext>;
export type UpsertSubscriptionMutationResult = NonNullable<Awaited<ReturnType<typeof upsertSubscription>>>;
export type UpsertSubscriptionMutationBody = BodyType<SubscriptionInput>;
export type UpsertSubscriptionMutationError = ErrorType<unknown>;
/**
* @summary Create or upgrade subscription
*/
export declare const useUpsertSubscription: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof upsertSubscription>>, TError, {
        data: BodyType<SubscriptionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof upsertSubscription>>, TError, {
    data: BodyType<SubscriptionInput>;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map