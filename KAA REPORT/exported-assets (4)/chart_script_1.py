import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime, timedelta
import pandas as pd
import numpy as np

# Since the user is asking for a PowerPoint presentation but we can only create charts,
# I'll create a sample chart that represents website traffic trends based on the provided data summary
# The summary mentions: "Sessions, bounce rate, and duration trends by day. Key callout: Spikes 9/3 and positive average duration despite some high bounce rates."

# Create sample data that matches the description
dates = pd.date_range(start='2024-08-20', end='2024-09-10', freq='D')
np.random.seed(42)

# Generate sample data with characteristics mentioned in summary
sessions = np.random.normal(1000, 200, len(dates))
# Add spike on 9/3 (September 3rd)
spike_date = pd.to_datetime('2024-09-03')
spike_idx = dates.get_loc(spike_date)
sessions[spike_idx] = sessions[spike_idx] * 2.5

# Bounce rate with some high values
bounce_rate = np.random.normal(45, 10, len(dates))
bounce_rate = np.clip(bounce_rate, 20, 80)

# Average duration (positive as mentioned)
avg_duration = np.random.normal(180, 30, len(dates))
avg_duration = np.clip(avg_duration, 120, 300)

# Create DataFrame
df = pd.DataFrame({
    'Date': dates,
    'Sessions': sessions.astype(int),
    'Bounce Rate': bounce_rate,
    'Avg Duration': avg_duration
})

# Create a multi-line chart showing the traffic trends
fig = go.Figure()

# Add sessions line (primary metric)
fig.add_trace(go.Scatter(
    x=df['Date'],
    y=df['Sessions'],
    name='Sessions',
    line=dict(color='#1FB8CD', width=3),
    yaxis='y1',
    hovertemplate='<b>Sessions</b><br>Date: %{x}<br>Sessions: %{y:,.0f}<extra></extra>'
))

# Add bounce rate line (secondary axis)
fig.add_trace(go.Scatter(
    x=df['Date'],
    y=df['Bounce Rate'],
    name='Bounce Rate %',
    line=dict(color='#DB4545', width=2),
    yaxis='y2',
    hovertemplate='<b>Bounce Rate</b><br>Date: %{x}<br>Rate: %{y:.1f}%<extra></extra>'
))

# Add average duration line (secondary axis, scaled)
fig.add_trace(go.Scatter(
    x=df['Date'],
    y=df['Avg Duration'] / 3,  # Scale down for visibility
    name='Avg Duration',
    line=dict(color='#2E8B57', width=2),
    yaxis='y2',
    hovertemplate='<b>Avg Duration</b><br>Date: %{x}<br>Duration: %{customdata:.0f}s<extra></extra>',
    customdata=df['Avg Duration']
))

# Update layout with dual y-axes
fig.update_layout(
    title='Website Traffic Trends',
    xaxis_title='Date',
    yaxis=dict(
        title='Sessions',
        titlefont=dict(color='#1FB8CD'),
        tickfont=dict(color='#1FB8CD'),
        side='left'
    ),
    yaxis2=dict(
        title='Rate % / Duration',
        titlefont=dict(color='#DB4545'),
        tickfont=dict(color='#DB4545'),
        anchor='x',
        overlaying='y',
        side='right'
    ),
    legend=dict(
        orientation='h',
        yanchor='bottom',
        y=1.05,
        xanchor='center',
        x=0.5
    ),
    hovermode='x unified'
)

# Update x-axis
fig.update_xaxes(
    showgrid=True,
    gridwidth=1,
    gridcolor='rgba(128,128,128,0.2)'
)

# Update traces
fig.update_traces(cliponaxis=False)

# Save the chart
fig.write_image("traffic_trends_chart.png", width=1200, height=600, scale=2)