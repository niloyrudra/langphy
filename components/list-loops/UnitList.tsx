import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import UnitRectangleCard from '../UnitRectangleCard';
import SIZES from '@/constants/size';
import { useLocalSearchParams } from 'expo-router';
import LoadingScreenComponent from '../LoadingScreenComponent';
import { useUnits } from '@/hooks/useUnits';
import { LocalUnitType } from '@/types';
import OfflineUnitGuard from '../offline/OfflineUnitGuard';
import { useTheme } from '@/theme/ThemeContext';
import { useNetwork } from '@/context/NetworkContext';

const UnitList = () => {
    const { colors } = useTheme();
    const { isOnline } = useNetwork();
    const { categoryId, title: categoryTitle } = useLocalSearchParams();

    const {
        data: units,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useUnits(categoryId as string);

    const [refreshing, setRefreshing] = React.useState(false);

    // ── Auto-retry when network returns ──────────────────────────────────────
    // When the guard is showing (error or no data) and the network comes back,
    // automatically attempt a refetch. This dismisses the guard if data loads.
    // The dependency on `isOnline` means this fires exactly once per
    // transition from offline → online, not on every render.
    const hasData = !!units?.length;
    React.useEffect(() => {
        if (isOnline && !hasData) {
            refetch();
        }
    }, [isOnline]); // intentionally only isOnline — refetch is stable from React Query

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            await refetch();
        } finally {
            setRefreshing(false);
        }
    }, [refetch]);

    if (isLoading || (isFetching && !hasData)) return <LoadingScreenComponent />;

    if (error || !hasData) {
        return (
            <OfflineUnitGuard
                categoryTitle={categoryTitle as string}
                reason={error ? 'fetch_failed' : 'no_data'}
                // onRetry triggers a real React Query refetch — if it succeeds,
                // `units` becomes non-empty and this guard unmounts automatically.
                onRetry={refetch}
            />
        );
    }

    return (
        <FlatList
            data={units}
            keyExtractor={({ id }: LocalUnitType) => id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            ListHeaderComponent={<View style={styles.noSpace} />}
            ListFooterComponent={<View style={styles.space} />}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[colors.primary]}
                    tintColor={colors.primary}
                />
            }
            renderItem={({ item: { title, category_id, id, slug } }: { item: LocalUnitType }) => (
                <UnitRectangleCard
                    title={title}
                    categoryId={category_id}
                    unitSlug={slug}
                    unitId={id}
                />
            )}
        />
    );
};

export default UnitList;

const styles = StyleSheet.create({
    list: { gap: SIZES.cardGap },
    noSpace: { height: 0 },
    space: { height: 30 },
});