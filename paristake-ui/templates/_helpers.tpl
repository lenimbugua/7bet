{{/*
Expand the name of the chart.
*/}}
{{- define "paristake-ui.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "paristake-ui.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "paristake-ui.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "paristake-ui.labels" -}}
helm.sh/chart: {{ include "paristake-ui.chart" . }}
{{ include "paristake-ui.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "paristake-ui.selectorLabels" -}}
app.kubernetes.io/name: {{ include "paristake-ui.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "paristake-ui.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "paristake-ui.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Expand the chart fullname
*/}}
{{- define "app.fullname" -}}
{{- printf "%s" .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- end }}

{{/*
Environment-aware hostname
*/}}
{{- define "gateway.hostname" -}}
{{- index .Values.hosts .Values.environmentSuffix | default "example.paristake.com" -}}
{{- end }}

{{/*
TLS secret name derived from hostname
*/}}
{{- define "gateway.tlsSecretName" -}}
{{- include "gateway.hostname" . | splitList ".paristake.com" | first | default "default" -}}-tls-secret
{{- end }}

{{/*
Generate middleware name from chart fullname and suffix
*/}}
{{- define "middleware.name" -}}
{{- printf "%s-%s" (include "app.fullname" .) . -}}
{{- end }}

{{/*
Gateway listener template
*/}}
{{- define "gateway.listener" -}}
- name: {{ .name }}
  protocol: {{ .protocol }}
  port: {{ .port }}
  {{- if .hostname }}
  hostname: {{ .hostname | quote }}
  {{- end }}
  {{- if .tls }}
  tls:
{{ toYaml .tls | nindent 4 }}
  {{- end }}
{{- end }}
